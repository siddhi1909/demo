const peopleURL = 'https://swapi.co/api/people'
const planetURL = 'https://swapi.co/api/planets'

export default function (url, options, timeout = 7000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

export const searchPeople = async q => {
        await fetch(`${peopleURL}/?search=${q}`).then((result) => {
            const {results = []} = result.json();
            return results.map(char => ({
                ...char,
                // For some reason API doesnt return id
                id: char.url.slice(0, -1).split('/people/')[1],
            }))
        })
            .catch((error) => {
                console.log('error =>', error);
            })
}
export const searchPlanets = async (q, page) => {
    const res = await fetch(`${planetURL}/?search=${q}&page=${page}`)
    const {results = [], count = 0} = await res.json()

    let planetResults = results.map(char => ({
        ...char,
        // For some reason API doesnt return id
        id: char.url.slice(0, -1).split('/planets/')[1],
    }));

    return {results: [...planetResults], count: count};
}

export const getPlanetDetails = async url => {
    const res = await fetch(`${url}`)
    return await res.json()
}
