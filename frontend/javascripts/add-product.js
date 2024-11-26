const addProductForm = document.getElementById('add-product-form');

function  generateUniqueID() {
    return 'product-' + Date.now(); // Using timestamp for simplicity
}

addProductForm.addEventListener('submit',async (e) => {
  e.preventDefault();

  const name = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const image = document.getElementById('product-image');
  const id=await generateUniqueID();
//   alert(id);
  const imagefile = image.files[0];

  // Create FormData object
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('product_id',id);
  formData.append('file', imagefile);

  console.log(formData.get('name'));
  console.log(formData.get('description'));
  console.log(formData.get('product_id'));
  console.log(formData);  
  // Send the request using FormData
  fetch('http://localhost:4000/api/product/add', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Product details:', data);
    })
    .catch((error) => {
      console.log('Error occurred:', error);
    });

  await alert('Product added successfully!');
  window.location.href = 'index.html';
});

const backbtn=document.getElementById('back-btn');

backbtn.addEventListener('click',()=>{
    window.location.href="index.html"
});
