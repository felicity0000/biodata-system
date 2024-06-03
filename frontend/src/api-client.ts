import { PeopleType } from "../../backend/src/models/people";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const register = async (BiodataFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/`, {
        method: "POST",
        credentials: "include",
        body: BiodataFormData,
    });

    if(!response.ok) {
        throw new Error("failed");
    }

    return response.json();
};

export const fetchPeople = async():Promise<PeopleType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/users/`, {
        credentials: "include",
    });

    if(!response.ok) {
        throw new Error("Error fetching people");
    }
    const data: PeopleType[] = await response.json();
    return data;
};

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message)
    }
    return body;
}

export const validateToken = async ()=> {
    const response = await fetch(`${API_BASE_URL}/api/admin/validate-token`,{
        credentials: "include"
    });

    if(!response.ok) {
        throw new Error("Token invlid");
    }

    return response.json();
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/logout`, {
        credentials: "include",
        method:"POST",
    });

    if(!response.ok){
        throw new Error("Error during sign out");
    }
}