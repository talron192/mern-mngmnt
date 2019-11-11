import React from '../../node_modules/react'
import '../../node_modules/font-awesome/css/font-awesome.min.css';

const SidebarIcon = ({handleClick, isOpen}) => {
  return <span onClick={handleClick}>
    {isOpen ? <i class="fa fa-times" aria-hidden="true"></i> : <i class="fa fa-bars" aria-hidden="true"></i>}
  </span>
}
export default SidebarIcon