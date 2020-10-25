import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateRoute } from '../../redux/route/route.actions';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

import ProfileModal from '../modal/modal.component';

const AvatarIcon = ({ route, setRoute, activeUser }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [modal, setModal] = useState(false);

	const toggle = () => setDropdownOpen(prevState => !prevState);
	const toggleModal = () => {
		setModal(!modal);
	};

	return (
		<div className='pa4 pb2 tc'>
			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle
					tag='div'
					data-toggle='dropdown'
					aria-expanded={dropdownOpen}
				>
					<div
						className='br-100 ba h3 w3 flex grow pointer'
						style={{
							marginLeft: '0.5rem',
							background: 'url("http://tachyons.io/img/logo.jpg")'
						}}
					>
						<div
							className='br-100 ba'
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '3rem',
								height: '3rem',
								margin: 'auto',
								marginTop: 'auto',
								background: 'rgba(0, 0, 0, 0.75)'
							}}
						>
							<span
								style={{
									color: '#fff',
									fontFamily: 'system-ui',
									fontStyle: 'italic'
								}}
							>
								{activeUser.name[0].toUpperCase()}
							</span>
						</div>
					</div>
				</DropdownToggle>
				<DropdownMenu
					className='b--transparent shadow-5'
					style={{
						position: 'absolute',
						willChange: 'transform',
						top: '0px',
						left: '0px',
						transform: 'translate3d(-167px, 0px, 0px)',
						backgroundColor: 'rgba(255, 255, 255, 0.4)'
					}}
				>
					<DropdownItem style={{ padding: '0' }}>
						<ProfileModal
							toggleModal={toggleModal}
							modal={modal}
							userName={activeUser.name}
							toggleDropdown={toggle}
						/>
					</DropdownItem>
					<DropdownItem onClick={() => setRoute(route)}>Sign Out</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

const mapStateToProps = state => ({
	route: state.setRoute.route,
	activeUser: state.setUser.activeUser
});

const mapDispatchToProps = dispatch => ({
	setRoute: route => dispatch(updateRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarIcon);
