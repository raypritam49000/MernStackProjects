import React, { Component } from 'react'
import logo from '../../../assets/images/SahosoftMallBachend-logo.png'
import UserPanel from './user_panel'
import { MENUITEMS } from '../../../_constants/menu'
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            //mainMenu : MENUITEMS
            mainMenu: []
        }
    }

    setNavActive(item) {
        MENUITEMS.filter(menuItem => {
            if (menuItem != item) {
                menuItem.active = false;
            }

            if (menuItem.children && menuItem.children.includes(item)) {
                menuItem.active = true;
            }

            if (menuItem.children) {
                menuItem.children.filter(subMenuItem => {
                    if (subMenuItem != item) {
                        subMenuItem.active = false;
                    }

                    if (subMenuItem.children) {
                        if (subMenuItem.children.includes(item)) {

                            subMenuItem.children.filter(itms => {
                                if (itms != item) {
                                    itms.active = false;
                                }
                            });
                            subMenuItem.active = true;
                            menuItem.active = true;
                        }
                    }
                })
            }


        });

        item.active = !item.active;
        this.setState({ menuItem: MENUITEMS });

    }

    componentWillMount() {
        this.setState({ mainMenu: MENUITEMS });
    }

    render() {
        const mainMenu = this.state.mainMenu.map((menuItem, i) => {
            return <li key={i} className={`${menuItem.active ? 'active' : ''}`} >
                {
                    menuItem.type === 'sub' ?
                        <a className='sidebar-header' onClick={() => this.setNavActive(menuItem)} >
                            <menuItem.icon />
                            <span>{menuItem.title}</span>
                            <i className='fa fa-angle-right pull-right' ></i>
                        </a>
                        :
                        <Link to={menuItem.path} className={`sidebar-header ${menuItem.active ? 'active' : ''}`}
                            onClick={() => this.setNavActive(menuItem)} >
                            <menuItem.icon />
                            <span>{menuItem.title}</span>
                        </Link>
                }

                {
                    menuItem.children ?
                        <ul className={`sidebar-submenu ${menuItem.active ? 'menu-open' : 'menu-close'} `}>
                            {
                                menuItem.children.map((childrenItem, index) => {
                                    return <li key={index} className={`${childrenItem.children ? childrenItem.active ? 'active' : '' : ''}`}>
                                        {
                                            childrenItem.type === 'sub' ?
                                                <a className='sidebar-header' onClick={() => this.setNavActive(childrenItem)} >
                                                    <span>{childrenItem.title}</span>
                                                    <i className='fa fa-angle-right pull-right' ></i>
                                                </a>
                                                :
                                                <Link to={childrenItem.path} className={`sidebar-header ${childrenItem.active ? 'active' : ''}`}
                                                    onClick={() => this.setNavActive(childrenItem)} >
                                                    <span>{childrenItem.title}</span>
                                                </Link>
                                        }


                                        {
                                            childrenItem.children ?
                                                <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : 'menu-close'} `}>
                                                    {
                                                        childrenItem.children.map((childrenSubItem, index) => {
                                                            return <li key={index} className={`${childrenSubItem.children ? childrenSubItem.active ? 'active' : '' : ''}`}>
                                                                {
                                                                    <Link to={childrenSubItem.path} className={`sidebar-header ${childrenSubItem.active ? 'active' : ''}`}
                                                                        onClick={() => this.setNavActive(childrenSubItem)} >
                                                                        <span>{childrenSubItem.title}</span>
                                                                    </Link>
                                                                }
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                                :
                                                ''
                                        }


                                    </li>
                                })
                            }
                        </ul>
                        :
                        ''
                }
            </li>
        });

        return (
            <div className="page-sidebar">
                <div className="main-header-left d-none d-lg-block">
                    <div className="logo-wrapper">
                        <img className="blur-up lazyloaded" alt="sahosoft logo" src={logo} />
                    </div>
                </div>
                <div className="sidebar custom-scrollbar">
                    <div>
                        <UserPanel />
                    </div>
                    <ul className="sidebar-menu">
                        {
                            mainMenu
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
