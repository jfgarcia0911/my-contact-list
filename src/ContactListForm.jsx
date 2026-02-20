import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
export default function ContactListForm(props) {
	// use state functions
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");

	// get the contact values from the form
	const getContactValues = (e) => {
		e.preventDefault();
		creatingContact(name, number, email);
	};

	// creating contact function its use to create contact items
	const creatingContact = (name, number, email, id = Date.now()) => {
		// checking that user not give empty inputs
		if (name?.trim() === "") {
			toast.error("Missing details: Please enter your name");
			return;
		}
		if (number?.trim() === "") {
			toast.error("Missing details: Please enter your phone number");
			return;
		}
		if (email?.trim() === "") {
			toast.error("Missing details: Please enter your email");
			return;
		}
		// Simple email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			toast.error("Please enter a valid email address");
			return;
		}
		props.contactTempData({
			name: name.trim(),
			phone: number.trim(),
			email: email.trim(),
			id,
		});
    //Set the input fields to empty after submit the form
		setName("");
		setEmail("");
		setNumber("");
		// show toast funtion for for show notification
		toast.success("Contact added successfully!");
		
	};

	return (
		<div className="mt-3">
			<form>
				<div className="flex justify-center gap-12 items-center">
					<input
						className=" border border-gray-700 shadow-lg shadow-blue-200 focus:outline-none  text-white placeholder-gray-400 text-sm rounded-sm pl-3 py-3 w-50 focus:border-blue-300"
						type="text"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<input
						className=" border border-gray-700 shadow-lg shadow-blue-200 focus:outline-none  text-white placeholder-gray-400 text-sm rounded-sm pl-3 py-3 w-50 focus:border-blue-300"
						type="text"
						placeholder="Phone No."
						value={number}
						onChange={(e) => setNumber(e.target.value)}
						required
					/>
					<input
						className=" border border-gray-700 shadow-lg shadow-blue-200 focus:outline-none  text-white placeholder-gray-400 text-sm rounded-sm pl-3 py-3 w-50 focus:border-blue-300"
						type="email"
						placeholder="Email id"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<button
						type="submit"
						onClick={(e) => {
							getContactValues(e);
						}}
					>
						<img
							className="w-8 h-8"
							src="https://cdn-icons-png.flaticon.com/512/1057/1057240.png"
							alt="Add Contact"
						/>
					</button>
				</div>
			</form>
		</div>
	);
}
