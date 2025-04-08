document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('/api/dishes');
    const dishes = await response.json();
    
    const tableBody = document.querySelector('tbody');
    
    dishes.forEach(dish => {
        const row = document.createElement('tr');
        const [hungarianName, englishName] = dish.name.split(' - ');
        
        row.innerHTML = `
                <td>
                    <div class="dish-name">${hungarianName}</div>
                    <div class="dish-name-english">${englishName}</div>
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
                <td class="center">${dish.cookingTime} min</td>
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
            button.addEventListener('click', async () => {
                const id = button.getAttribute('data-id');
                const confirmation = confirm('Are you sure you want to delete this dish?');
                if (!confirmation) return;
                else {
                    try {
                        const deleteResponse = await fetch(`/api/dishes/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!deleteResponse.ok) {
                            throw new Error('Failed to delete dish');
                        } else {
                            alert('Dish deleted successfully!');
                            const row = button.closest('tr');
                            row.remove();
                        }
                    }
                    catch (error) {
                        console.error('Error deleting dish:', error);
                    }
                }

                console.log(`Delete dish with ID: ${id}`);
                
            });
        });
});