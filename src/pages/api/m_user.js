import jwtDecode from 'jwt-decode';
import nc from 'next-connect';

import logger from '@/config/logger';

import { authMiddleware } from '../../../middleware';

const handler = nc({
    onError: (err) => {
        logger.error('M_User err ', { message: JSON.stringify(err.stack) });
        // res.status(500).end('Something broke!')
    },
    onNoMatch: (req, res) => {
        res.status(404).end('Эхххх, та буруу л дэлгэц рүү ороод байна даа.');
    },
})
    .use(authMiddleware)
    .get(async (req, res) => {
        const id_token = req.session.id_token;
        if (id_token) {
            let decoded = jwtDecode(id_token);
            res.status(200).json({
                preferred_username: decoded?.preferred_username,
                given_name: decoded?.given_name,
                client: decoded?.client,
                family_name: decoded?.family_name,
                email: decoded?.email,
                exp_time: req?.session?.expTime,
                roles: decoded?.roles,
                isLoggedIn: true,
            });
        } else {
            res.status(200).json({
                isLoggedIn: false,
            });
        }
    });

export default handler;
