document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('/api/dishes');
    const dishes = await response.json();
    
    const tableBody = document.querySelector('tbody');
    
    dishes.forEach(dish => {

        // Create a new table row for each dish
        // and populate it with the dish data
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
                const isVisible = contentList.style.display === 'flex';
                contentList.style.display = isVisible ? 'none' : 'flex'; 
            });
        });

        const modal = document.getElementById('updateModal');
        const updateForm = document.getElementById('updateForm');

        // Add dish
        document.getElementById('addRecipeBtn').addEventListener('click', () => {
            updateForm.reset();

            updateForm.dataset.mode = 'add';
            updateForm.dataset.id = '';

            document.getElementById('modalTitle').textContent = 'Add New Recipe';
            document.getElementById('submitUpdate').textContent = 'Add Recipe';

            modal.style.display = 'flex';
        });


        // Update dish
        const updateButtons = document.querySelectorAll('.update-btn');
        const closeModalButton = document.getElementById('closeModal');
        
        updateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const dish = dishes.find(dish => dish._id === id);

                document.getElementById('recipeName').value = dish.name;
                document.getElementById('ingredients').value = dish.ingredients.join(',\n');
                document.getElementById('preparationSteps').value = dish.preparationSteps.join(',\n');
                document.getElementById('cookingTime').value = dish.cookingTime;
                document.getElementById('servings').value = dish.servings;
                document.getElementById('origin').value = dish.origin;

                updateForm.dataset.mode = 'update';
                updateForm.dataset.id = id;

                document.getElementById('modalTitle').textContent = 'Update Recipe';
                document.getElementById('submitUpdate').textContent = 'Update Recipe';

                modal.style.display = 'flex';
                
                console.log(`Update dish with ID: ${id}`);
            });
        });

        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Send add/update request to the server
        updateForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const mode = updateForm.dataset.mode;

            const id = updateButtons[0].getAttribute('data-id');
            const formData = new FormData(updateForm);
            const data = {
                name: formData.get('recipeName'),
                ingredients: formData.get('ingredients').split(',\n'),
                preparationSteps: formData.get('preparationSteps').split(',\n'),
                cookingTime: formData.get('cookingTime'),
                servings: formData.get('servings'),
                origin: formData.get('origin')
            };

            try {
                // Update
                if (mode === 'update') {
                    const updateResponse = await fetch(`/api/dishes/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (!updateResponse.ok) {
                        throw new Error('Failed to update dish');
                    } else {
                        alert('Dish updated successfully!');
                    }

                // Add
                } else if( mode === 'add') {
                    const addResponse = await fetch('/api/dishes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (!addResponse.ok) {
                        throw new Error('Failed to add dish');
                    } else {
                        alert('Dish added successfully!');
                    }
                }

                modal.style.display = 'none';
                location.reload();
            }
            catch (error) {
                console.error('Error updating dish:', error);
            }});

        // Delete dish
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
                            console.log(`Delete dish with ID: ${id}`);
                        }
                    }
                    catch (error) {
                        console.error('Error deleting dish:', error);
                    }
                }
                
            });
        });
});