import { http, HttpResponse } from 'msw';

export const handlers = [
    http.post('https://www.reddit.com/api/v1/access_token', () => {
        return HttpResponse.json({
            "access_token": "acessToken123",
            "token_type": "bearer",
            "expires_in": 36000,
            "scope": "read",
        })
    }),
]