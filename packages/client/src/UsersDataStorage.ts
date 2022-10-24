import { SMEUsersResponse } from './dashboard/models/DTOs';
import { UserModel } from './dashboard/models/Models';


export const UserDataStorage= (()=> {
    let currentUserEmail = '';
    let smeUsers = [] as SMEUsersResponse[];
    return {
        getCurrentUserEmail: () => currentUserEmail,
        setCurrentUserEmail: (value: string) => currentUserEmail = value,
        setSmeUsers: (value: SMEUsersResponse[]) => smeUsers = value,
        getUserDataById:(id:string): UserModel=>{
            return smeUsers
                .filter(smeUser=>smeUser.id === id)
                .map(user=>({image: user.profileImage, userName: user.name}))[0]
        }
    }
})()
