document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('/api/dishes');
    const dishes = await response.json();
    
    const tableBody = document.querySelector('tbody');
    
    dishes.forEach(dish => {
        const row = document.createElement('tr');
        const [hungarianName, englishName] = dish.name.split(' - ');
        
        row.innerHTML = `
                <td>
                    <div>${hungarianName}</div>
                    <div style="font-style: italic">${englishName}</div>
                </td>
                <td class="center">
                    <span class="toggle-content">Ingredients</span>
                    <ul class="content-list" style="display: none;">
                        ${dish.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </td>
                <td class="center">
                    <span class="toggle-content">Steps</span>
                    <ol class="content-list" style="display: none;">
                        ${dish.preparationSteps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </td>
                <td class="center">${dish.cookingTime}</td>
                <td class="center">${dish.servings}</td>
                <td class="center">${dish.origin}</td>
                <td class="center">
                    <button class="update-btn" data-id="${dish._id}">Update</button>
                    <button class="delete-btn" data-id="${dish._id}">Delete</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        const toggleContents = document.querySelectorAll('.toggle-content');
        toggleContents.forEach(item => {
            item.addEventListener('click', () => {
                const contentList = item.nextElementSibling;
                const isVisible = contentList.style.display === 'block';
                contentList.style.display = isVisible ? 'none' : 'block'; 
            });
        });

        const updateButtons = document.querySelectorAll('.update-btn');
        updateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                console.log(`Update dish with ID: ${id}`);
                // Implementáld itt a frissítés logikát
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                console.log(`Delete dish with ID: ${id}`);
                // Implementáld itt a törlés logikát
            });
        });
});