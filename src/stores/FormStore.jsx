import { create } from "zustand";

const useLoginFormStore = create((set) => ({
	usernameEmail: "",
	password: "",
	updateUsernameEmail: (usernameEmail) =>
		set((pre) => ({ ...pre, usernameEmail: usernameEmail })),
	updatePassword: (password) =>
		set((pre) => ({ ...pre, password: password })),
}));

const useSignupFormStore = create((set) => ({
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	user_type: "basic",
	updateUsername: (username) => set((pre) => ({ ...pre, username })),
	updatePassword: (password) => set((pre) => ({ ...pre, password })),
	updateConfirmPassword: (confirmPassword) =>
		set((pre) => ({ ...pre, confirmPassword })),
	updateEmail: (email) => set((pre) => ({ ...pre, email })),
	updateUser_type: (user_type) => set((pre) => ({ ...pre, user_type })),
}));

export { useLoginFormStore, useSignupFormStore };
