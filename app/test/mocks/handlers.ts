import { http, HttpResponse } from 'msw';

export const handlers = [
    http.post('https://www.reddit.com/api/v1/access_token', () => {
        return HttpResponse.json({
            "access_token": "accessToken123",
            "token_type": "bearer",
            "expires_in": 36000,
            "scope": "read",
            "refresh_token": "refreshToken123"
        });
    }),
    http.get('https://oauth.reddit.com/subreddits/search?limit=15&show=all&show_users=true&sort=relevance&typeahead_active=None&q=test', () => {
        return HttpResponse.json({
            listing: "Listing",
        });
    }),
]