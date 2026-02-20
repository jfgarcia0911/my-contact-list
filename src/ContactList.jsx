import React from "react";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import editIcon from "/edit.png";
import mailIcon from "/mail.png";
import userIcon from "/user.png";
import phoneIcon from "/phone-call.png";
import trashIcon from "/delete.png";
import closeIcon from "/close.png";

export default function ContactList(props) {
	// create use state function
	const [contactList, setContactList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState({
		name: "",
		phone: "",
		email: "",
		id: "",
	});
	const [open, setOpen] = useState(false);
	const buttonRef = useRef(null);
	const dropdownRef = useRef(null);

	const updateContactFromTheList = (value) => {
		// ✅ Validates input
		if (
			value.name?.trim() === "" ||
			value.phone?.trim() === "" ||
			value.email?.trim() === ""
		) {
			toast.error("You can not keep empty form when updating contact");
			return;
		}

		// ✅ Updates local state with new contact data
		const updateContact = contactList.map((contact) => {
			if (contact.id === value.id) {
				contact = value; // Replace old contact with updated values
			}
			return contact;
		});
		setContactList(updateContact); // Re-render with new data

		// ✅ Shows success message
		toast.success("Contact updated successfully!");

		// ✅ Updates API
		fetch(`https://jsonplaceholder.typicode.com/users/${value.id}`, {
			method: "PUT",
			body: JSON.stringify(value),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});
	};

	// Handled edit contact function
	const onChangeEdit = (e) => {
		e.preventDefault();
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	// Set contact data for editing and open modal
	const handleEditClick = (contact) => {
		console.log(contact);
		setValue({
			name: contact.name,
			phone: contact.phone,
			email: contact.email,
			id: contact.id,
		});
		setOpen(true);
	};

	// Delete contact from the list
	const deleteContactFromTheList = (contactId) => {
		// Remove from local state
		const updatedContacts = contactList.filter(
			(contact) => contact.id !== contactId,
		);
		setContactList(updatedContacts);
		toast.success("Contact deleted successfully!");
	};

	// fetching contact list from json place holder
	useEffect(() => {
		const fetchContacts = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/users",
				);
				const data = await response.json();
				setContactList(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching contacts:", error);
				toast.error("Failed to fetch contacts");
				setLoading(false);
			}
		};
		fetchContacts(); //Call immediately
	}, []);

	// Merge new contacts from props with existing contacts when props.data changes
	useEffect(() => {
		if (props.data && props.data.length > 0) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setContactList((prevContactList) => [
				...props.data,
				...prevContactList,
			]);
		}
	}, [props.data]); // Runs when props.data changes

	// close modal when clicking outside of button or menu
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="flex justify-center ">
			{/* Modal */}
			{open && (
				<div
					ref={dropdownRef}
					className="absolute top-12 left-1/2 -translate-x-1/2 bg-blue-300 rounded-lg shadow-lg z-50 border border-gray-300 w-96"
				>
					<div className="flex px-4 py-5 items-center justify-between border-b-4 border-gray-300">
						<h1 className="text-white text-2xl font-semibold">
							Edit Contact
						</h1>
						<img
							src={closeIcon}
							alt="Close Icon"
							className="h-4 cursor-pointer"
							onClick={() => setOpen(!open)}
						/>
					</div>

					{/* Form Body */}
					<div className="px-4 py-4 space-y-4">
						{/* Name Input */}
						<div>
							<label className="text-white text-sm font-semibold block mb-2">
								Name
							</label>
							<input
								type="text"
								name="name"
								value={value.name}
								onChange={onChangeEdit}
								className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
								placeholder="Enter name"
							/>
						</div>

						{/* Phone Input */}
						<div>
							<label className="text-white text-sm font-semibold block mb-2">
								Phone
							</label>
							<input
								type="text"
								name="phone"
								value={value.phone}
								onChange={onChangeEdit}
								className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
								placeholder="Enter phone"
							/>
						</div>

						{/* Email Input */}
						<div>
							<label className="text-white text-sm font-semibold block mb-2">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={value.email}
								onChange={onChangeEdit}
								className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
								placeholder="Enter email"
							/>
						</div>

						{/* Buttons */}
						<div className="flex gap-2 justify-end pt-4">
							<button
								onClick={() => setOpen(!open)}
								className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
							>
								Cancel
							</button>
							<button
								onClick={() => {
									updateContactFromTheList(value); 
									setOpen(false);
								}}
								className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
			<div
				ref={buttonRef}
				className="mt-10 rounded-lg  border border-gray-700 shadow-lg shadow-blue-200"
			>
				{/* Header Row */}
				<div className="grid grid-cols-7 sm:gap-15 md:gap-25 text-white bg-orange-500 p-2 ">
					<div className="col-span-2 flex items-center gap-2 ">
						<img className="h-6" src={userIcon} alt="User Icon" />
						<h1>Name</h1>
					</div>
					<div className="col-span-2 flex items-center gap-2">
						<img className="h-6" src={phoneIcon} alt="Phone Icon" />
						<h1>Phone no.</h1>{" "}
					</div>
					<div className="col-span-2 flex items-center gap-2">
						<img className="h-6" src={mailIcon} alt="Mail Icon" />
						<h1>Email</h1>
					</div>
					<div> </div>
				</div>

				{/* Contact Rows - Loop through contactList */}
				{contactList.map((contact, index) => (
					<div
						key={contact.id}
						className={`grid grid-cols-7 sm:gap-15 md:gap-25 text-white p-2 ${
							index % 2 === 0 ? "bg-gray-600" : "bg-orange-500/50"
						}`}
					>
						<div className="col-span-2">{contact.name}</div>
						<div className="col-span-2">{contact.phone}</div>
						<div className="col-span-2">{contact.email}</div>
						<div className="flex gap-2">
							{/* Edit Button */}
							<button
								onClick={() => handleEditClick(contact)}
								type="button"
								aria-label={`Edit button icon`}
								className="flex items-center cursor-pointer"
							>
								<img
									src={editIcon}
									alt="Edit Icon"
									className="h-5 transition-transform duration-300 hover:scale-110 brightness-150"
								/>
							</button>
							{/* Delete Button */}
							<button
								onClick={() => {
									deleteContactFromTheList(contact.id);
								}}
								type="button"
								aria-label={`Trash button icon`}
								className="flex items-center cursor-pointer"
							>
								<img
									src={trashIcon}
									alt="Trash Icon"
									className="h-5 transition-transform duration-300 hover:scale-110 brightness-150"
								/>
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
