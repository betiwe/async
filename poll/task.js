let startTitle = document.getElementById('poll__title');
let startAnswers = document.getElementById('poll__answers');
let xhr = new XMLHttpRequest();
let title;
let answers;

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

xhr.addEventListener('readystatechange', () => {
  if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    let answer = JSON.parse(xhr.responseText);

    title = answer.data.title;
    answers = answer.data.answers;

    startTitle.innerHTML = title;
    answers.forEach((item) => {
      startAnswers.innerHTML += `
                <button class="poll__answer">
                    ${item}
                </button>
            `;
    });

    answers = Array.from(document.querySelectorAll('.poll__answer'));

    answers.forEach((item) => {
      item.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');
      });
    });
  }
});
