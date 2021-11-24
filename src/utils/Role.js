export function isTeacher(role) {
    if (role === 'teacher' || role === 'owner') {
        return true;
    }
    return false;
}

export function isOwner(role) {
    if (role === 'owner') {
        return true;
    }
    return false;
}

export function isStudent(role) {
    if (role === 'student') {
        return true;
    }
    return false;
}