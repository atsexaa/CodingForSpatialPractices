document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://api.sheety.co/a7a1c2b2aa1358036c0308dad51b9892/newAndIndependentDesignersAtsede/designers';
    const navItemBrands = document.querySelector('[data-category="brands-a-z"]');
    const dropdown = navItemBrands.parentElement.querySelector('.dropdown');
    const navItemBlackDesigners = document.querySelector('[data-category="black-designers"]');
    const blackDesignersDropdown = navItemBlackDesigners.parentElement.querySelector('.black-designers-dropdown');
    const navItemMenswear = document.querySelector('[data-category="menswear"]');
    const menswearDropdown = navItemMenswear.parentElement.querySelector('.menswear-dropdown');
    const brandDisplayContainer = document.querySelector('.brand-display-container');
  
    let designersData = [];

    fetch(url)
    .then(response => response.json())
    .then(json => {
      designersData = json.designers;
      populateBrandsDropdown(designersData);
      populateBlackDesignersDropdown(designersData);
      populateMenswearDropdown(designersData); // Call after data is ready
    })
    .catch(error => console.error('Error fetching data:', error));

  function populateBrandsDropdown(data) {
    const brandNames = [...new Set(data.map(item => item.brandsAndDesigners).filter(Boolean))];
    dropdown.innerHTML = '';
    brandNames.forEach(brand => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = brand;
      a.setAttribute('data-brand', brand);
      li.appendChild(a);
      dropdown.appendChild(li);
    });
  }

  function populateBlackDesignersDropdown(data) {
    const blackDesignerBrands = data.filter(item => item.blackDesignerYesOrNo === "Yes" && item.brandsAndDesigners);
    const brandNames = [...new Set(blackDesignerBrands.map(item => item.brandsAndDesigners))].sort((a, b) => a.localeCompare(b));
    blackDesignersDropdown.innerHTML = '';
    brandNames.forEach(brand => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = brand;
      a.setAttribute('data-brand', brand);
      li.appendChild(a);
      blackDesignersDropdown.appendChild(li);
    });
  }

  function populateMenswearDropdown(data) {
    const menswearBrands = data.filter(item => item.unisexYesOrNo === "Yes" && item.brandsAndDesigners);
    const brandNames = [...new Set(menswearBrands.map(item => item.brandsAndDesigners))]
      .sort((a, b) => a.localeCompare(b));
    menswearDropdown.innerHTML = '';
    brandNames.forEach(brand => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = brand;
      a.setAttribute('data-brand', brand);
      li.appendChild(a);
      menswearDropdown.appendChild(li);
    });
  }

  // Toggle dropdowns
  navItemBrands.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('show');
  });

  navItemBlackDesigners.addEventListener('click', (e) => {
    e.preventDefault();
    blackDesignersDropdown.classList.toggle('show');
  });

  navItemMenswear.addEventListener('click', (e) => {
    e.preventDefault();
    menswearDropdown.classList.toggle('show');
  });

  // Handle brand selection for both dropdowns using event delegation
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[data-brand]')) {
      e.preventDefault();
      const selectedBrand = e.target.getAttribute('data-brand');
      displayBrandContent(selectedBrand);
      dropdown.classList.remove('show');
      blackDesignersDropdown.classList.remove('show');
      menswearDropdown.classList.remove('show');
    }

    // Close dropdowns if clicked outside
    if (!e.target.closest('.nav-item')) {
      dropdown.classList.remove('show');
      blackDesignersDropdown.classList.remove('show');
      menswearDropdown.classList.remove('show');
    }
  });

  function displayBrandContent(brand) {
    const brandData = designersData.find(item => item.brandsAndDesigners === brand);
    if (brandData) {
      const { image1, image2, image1Description, image2Description, brandsAndDesigners, leadDesigner, place, about } = brandData;
      
      brandDisplayContainer.innerHTML = `
        <div class="brand-content">
          <div class="image-wrapper">
            <img src="${image1}" alt="${brandsAndDesigners} Image 1">
            <p><em>${image1Description}</em></p>
          </div>
          <div class="image-wrapper">
            <img src="${image2}" alt="${brandsAndDesigners} Image 2">
            <p><em>${image2Description}</em></p>
          </div>
        </div>
        <div class="brand-description">
          <h2>${brandsAndDesigners}</h2>
          <p><strong>Lead Designer(s):</strong> ${leadDesigner}</p>
          <p><strong>Home Base:</strong> ${place}</p>
          <p><em>${about}</em></p>
        </div>
      `;
    } else {
      brandDisplayContainer.innerHTML = `<p>No information available for ${brand}.</p>`;
    }
  }

  const aboutLink = document.querySelector('.about-link');
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      brandDisplayContainer.innerHTML = `
        <div class="About">
          <p><em>This directory was created by Atsede A., for the fall 2024 Columbia GSAPP course, "Coding for Spatial Practices."
          Seeing this as an opportunity to blend her life-long, innate kinship with fashion with her love for research and taking on new
          skills highlights, the directory is the start of a new platform for fashion discovery. The site is currently home to 75 designers
          spanning the globe, from New York to Tibilisi, Georgia, who have started up brands in the last few years and are quickly making a
          name for themselves, or have been a long-term magnetizing force in the underground. The site aims to give you a glimpse into their
          worlds and be a point of connectivity - hopefully a place from which your relationship with them, and my relationship
          with this medium can grow.</em></p>
        </div>
      `;
      dropdown.classList.remove('show');
      blackDesignersDropdown.classList.remove('show');
      menswearDropdown.classList.remove('show');
    });
});