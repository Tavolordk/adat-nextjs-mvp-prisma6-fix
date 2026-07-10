import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSessionToken, getSessionMaxAge } from '@/lib/auth';
import { SESSION_COOKIE } from '@/lib/constants';
import { loginSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !user.active) {
      return NextResponse.json({ message: 'Credenciales inválidas.' }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(data.password, user.passwordHash);
    if (!validPassword) {
      return NextResponse.json({ message: 'Credenciales inválidas.' }, { status: 401 });
    }

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    const response = NextResponse.json({
      message: 'Inicio de sesión correcto.',
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: getSessionMaxAge(),
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'No fue posible iniciar sesión.' },
      { status: 400 }
    );
  }
}
