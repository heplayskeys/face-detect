import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Profile from '../user-profile/user-profile.component';
import './modal.styles.scss';

const ProfileModal = ({ toggleModal, modal }) => {
	const logo = document.querySelector('.Tilt-inner');

	if (window.innerWidth <= 768 && modal) {
		logo.style.visibility = 'hidden';
	} else {
		logo.style.visibility = 'visible';
	}

	return (
		<div>
			<div style={{ padding: '0.25rem 1.5rem' }} onClick={toggleModal}>
				{'View Profile'}
			</div>
			<Modal isOpen={modal} toggle={toggleModal} className='shadow-5'>
				<ModalHeader toggle={toggleModal} />
				<ModalBody>
					<Profile />
				</ModalBody>
			</Modal>
		</div>
	);
};

export default ProfileModal;
