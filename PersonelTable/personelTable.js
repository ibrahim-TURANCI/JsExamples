function generateUserId() {
    const generatedId = generateRandomId();
    document.getElementById('generated-id').innerText = `${generatedId}`;
}

function generateRandomId() {
  return Math.floor(1000000 + Math.random() * 9000000); // 7 Haneli Sayı
}



                    // >>>>>>>  Background 1 to Table   <<<<<<<<