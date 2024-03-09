import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: '/',
};

export function middleware(req: NextRequest) {
    const basicAuth = req.headers.get('Authorization');
    
    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, password] = atob(authValue).split(':');

        if (user === process.env.BASIC_USER_NAME && password === process.env.BASIC_PASSWORD) {
            return NextResponse.next();
        }

        return NextResponse.json(
            { error: 'Invalid credentials' },
            { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }, status: 401 }
        );
    } else {
        return NextResponse.json(
            { error: 'Please enter credentials' },
            { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }, status: 401 }
        );
    }
}