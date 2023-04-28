const categories = document.querySelectorAll('.category');
  const items = document.querySelectorAll('.item');

  categories.forEach(category => {
    category.addEventListener('click', () => {
      // Cambiar la clase activa en la lista de categorías
      categories.forEach(c => c.classList.remove('active'));
      category.classList.add('active');

      // Mostrar los elementos correspondientes
      const filter = category.getAttribute('data-filter');
      items.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.classList.remove('inactive');
          item.classList.add('active');
        } else {
          item.classList.remove('active');
          item.classList.add('inactive');
        }
      });
    });
  });