import React from 'react'
import { Link } from 'react-router-dom'
import {
  BsGrid1X2Fill,      
  BsBoxSeam,         
  BsTagsFill,         
  BsPeopleFill,     
  BsShieldLockFill,  
  BsGearWideConnected 
} from 'react-icons/bs'

export default function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <br/><br/>
                <img src="https://gcdnb.pbrd.co/images/I6wMSzd70uJN.png?o=1" alt="" className='icon_header' />
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/Dashboard">
                    <BsGrid1X2Fill className='icon'/> Tableau de bord
                </Link>
            </li>
            
            <li className='sidebar-list-item'>
                <Link to="/products">
                    <BsBoxSeam className='icon'/> Produits
                </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link to="/categories">
                    <BsTagsFill className='icon'/> Catégories
                </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link to ="/Clients">
                    <BsPeopleFill className='icon'/> Clients
                </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link to ="/Authentification">
                    <BsShieldLockFill className='icon'/> Authentification
                </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link to ="/Setting">
                    <BsGearWideConnected className='icon'/> Paramètres
                </Link>
            </li>
        </ul>
    </aside>
  )
}