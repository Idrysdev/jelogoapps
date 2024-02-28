export function getMonthFirstAndLastDays(monthIndex) {
    const firstDay = new Date();
    firstDay.setMonth(monthIndex, 1);

    if (monthIndex > new Date().getMonth()) {
        firstDay.setFullYear(firstDay.getFullYear() - 1);
    }

    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);
    return [firstDay.toLocaleDateString('en-CA'), lastDay.toLocaleDateString('en-CA')];
}

export const getCreatDay = (createdAt) => {
    const dateCreateAt = new Date(createdAt);
    const year = dateCreateAt.getFullYear();
    const month = `0${dateCreateAt.getMonth() + 1}`.slice(-2);
    const day = `0${dateCreateAt.getDate()}`.slice(-2);

    const hours = `0${dateCreateAt.getHours()}`.slice(-2);
    const minutes = `0${dateCreateAt.getMinutes()}`.slice(-2);

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}h${minutes}`;
    return `${formattedDate} à ${formattedTime}`
};

export const getDateDiff = (startDate, endDate) => {
    let diff = endDate - startDate;
    const minutes = Math.floor(diff / (1000 * 60));
    return minutes
};

export const getMonthString = (month) => {
    const date = new Date();
    date.setMonth(month);

    if (month > new Date().getMonth()) {
        date.setFullYear(date.getFullYear() - 1);
    }
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export const dateString = (datestr, data) => {
    try {
        const date = datestr ? new Date(datestr) : new Date()
        const weekday = 'short'
        const day = data?.day ?? '2-digit'
        const month = data?.month ?? 'short'
        const year = data?.year ?? 'numeric'

        const options = { day, weekday };
        const formattedDate = date.toLocaleDateString('fr-FR', options);

        return formattedDate
    } catch (error) {

    }
};