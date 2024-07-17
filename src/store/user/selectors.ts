import { RootStateType } from "..";

export const userTokenSelector = (state: RootStateType): string | null => {
    return state.user.token
}
  
