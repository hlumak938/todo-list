import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { SECRET_KEY } from '@/config/constants';
import prisma from '../utils/prisma.client';

passport.use(
	'jwt',
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: SECRET_KEY,
		},
		async (payload, done) => {
			try {
				const user = await prisma.user.findUnique({
					where: { id: payload.id },
				});
				if (user) return done(null, user);
				return done(null, false);
			} catch (error) {
				return done(error, false);
			}
		},
	),
);
