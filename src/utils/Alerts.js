const hideAlert = () => {
  const el = document.querySelector('.alert');
  if(el) el.parentElement.removeChild(el);
};

export const showAlerts = (type, message, time = 3) => {
  console.log('hi')
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  const target = document.querySelector('.appbar');
  target.insertAdjacentHTML('afterend', markup);
  if(type !== 'warning--offline') window.setTimeout(hideAlert, time * 1000);
};

export const onlineStatus = () => {
  
}