export default function getCachedOrNewImage (avatars: Array<string>, user: string) {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    const session = window.sessionStorage.getItem(user);

    if (session) {
        return session;
    } else {
        const path = avatars[randomIndex];
        window.sessionStorage.setItem(user, path);
        return path;
    }
}