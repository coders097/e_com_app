export interface AuthState {
    _id: string;
    name: string;
    email: string;
    pic: string;
    phone: number;
    token: string;
    loggedIn: boolean;
};

let state:AuthState={
    _id: "",
    name: "",
    email: "",
    pic: "",
    phone: 0,
    token: "",
    loggedIn:false
};

export default state;