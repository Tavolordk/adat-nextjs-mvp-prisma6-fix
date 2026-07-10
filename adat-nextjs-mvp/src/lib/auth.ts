import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from './prisma';
import { SESSION_COOKIE } from './constants';

const EXPIRES_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: string;
};

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET no está configurado');
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as unknown as SessionPayload;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = await verifySessionToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true, role: true, active: true }
    });

    if (!user || !user.active) return null;
    return user;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) throw new Error('No autorizado');
  return user;
}

export function getSessionMaxAge() {
  return EXPIRES_SECONDS;
}
