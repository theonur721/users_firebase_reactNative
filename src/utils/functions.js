export const ConvertFullName = (name, surname) => {
  return name + ' ' + surname;
};

export function getInitials(name, surname) {
  if (!name || !surname) return '';

  const first = name.trim()[0].toUpperCase();
  const last = surname.trim()[0].toUpperCase();

  return first + last;
}
