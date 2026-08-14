document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Drawer Menu ---
  const menuToggle = document.getElementById('menuToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- Menu Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuGroups = document.querySelectorAll('.menu-group');
  const menuSearch = document.getElementById('menuSearch');
  const menuItems = document.querySelectorAll('.menu-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      // Clear search input when switching tabs
      if (menuSearch) menuSearch.value = '';

      menuGroups.forEach(group => {
        const groupCategory = group.getAttribute('data-group');
        if (category === 'all' || groupCategory === category) {
          group.style.display = 'block';
          // Ensure all child items inside displayed group are visible
          group.querySelectorAll('.menu-item').forEach(item => {
            item.style.display = 'flex';
          });
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  // --- Instant Search in Menu ---
  if (menuSearch) {
    menuSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (query === '') {
        // Reset to active tab state
        const activeFilter = document.querySelector('.filter-btn.active');
        const activeCategory = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
        
        menuGroups.forEach(group => {
          const groupCategory = group.getAttribute('data-group');
          if (activeCategory === 'all' || groupCategory === activeCategory) {
            group.style.display = 'block';
            group.querySelectorAll('.menu-item').forEach(item => {
              item.style.display = 'flex';
            });
          } else {
            group.style.display = 'none';
          }
        });
        return;
      }

      // Search across all groups and items
      menuGroups.forEach(group => {
        let hasVisibleItems = false;
        const items = group.querySelectorAll('.menu-item');

        items.forEach(item => {
          const title = item.querySelector('.menu-item-title').textContent.toLowerCase();
          const desc = item.querySelector('.menu-item-desc').textContent.toLowerCase();

          if (title.includes(query) || desc.includes(query)) {
            item.style.display = 'flex';
            hasVisibleItems = true;
          } else {
            item.style.display = 'none';
          }
        });

        if (hasVisibleItems) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  }

  // --- Sticky Header Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
});