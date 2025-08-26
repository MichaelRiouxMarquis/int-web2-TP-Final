        document.getElementById('menu-toggle').addEventListener('change', function (e) {
          const lines = document.querySelectorAll('.burger-line');
          if (e.target.checked) {
            // Menu ouvert - transformation en X
            lines[0].style.transform = 'translateY(10px) rotate(45deg)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'translateY(-10px) rotate(-45deg)';
          } else {
            // Menu fermé - retour à l'état burger
            lines[0].style.transform = '';
            lines[1].style.opacity = '';
            lines[2].style.transform = '';
          }
        });