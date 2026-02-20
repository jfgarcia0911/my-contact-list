import React from "react";
import { useState } from "react";
import ContactList from "./ContactList";
import ContactListForm from "./ContactListForm.jsx";
import { Toaster } from "react-hot-toast";

export default function Home() {
	// use state funtion
	const [newData, setNewData] = useState([]);

	// it creating props for update contact
	const fetchNewData = (data) => {
		const newArray = [];
		newArray.push(data);
		setNewData(newArray);
	};
	return (
		<div className="">
			<Toaster position="top-left" />

			<div className="flex justify-center items-center p-7">
				<img
					className="w-12 h-12 mr-2"
					src="https://cdn-icons-png.flaticon.com/512/7945/7945013.png"
					alt="contact-list-icon"
				/>
				<h1 className="text-5xl font-semibold text-white">
					My Contact List
				</h1>
			</div>
			<div>
				<ContactListForm contactTempData={fetchNewData} />
				<ContactList data={newData} />
			</div>
		</div>
	);
}
