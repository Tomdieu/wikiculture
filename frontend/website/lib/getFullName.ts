import { UserType } from '@/types';
export const getFullName = (user:UserType) => {
    if(user.first_name !== "" && user.last_name!==""){
        return user.first_name + " "+ user.last_name
    }
    return user.username
}