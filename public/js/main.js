$(document).ready(function () {
    // Toggle Sidebar
    var iconNav = $('#icon-nav');
    var sidebar = $('#sidebar');
    
    iconNav.click(function() {
        sidebar.toggleClass('show-nav');
    });

    // Toggle Dropdown 
    var dropper = $('#dropper');
    var dropMenu = $('#drop-menu');
    var iconDropper = $('#icon-dropper');

    dropper.click(function() {
        dropMenu.toggleClass('show-drop-menu');
        iconDropper.toggleClass('fa-chevron-down');
        iconDropper.toggleClass('fa-chevron-up');      
    });
});