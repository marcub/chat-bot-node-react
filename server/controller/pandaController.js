import fetch from "node-fetch";

export async function getUpcomingMatches(request, response, next) {

    try {
        const data = await fetch('https://api.pandascore.co/csgo/matches/upcoming?filter[opponent_id]=124530', {
            headers: {
                'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN_PANDA, 
                'Accept': 'application/json',
            }
        });

        if (data.error) {
            return response.status(data.status).json({ error: 'Erro ao buscar os jogos.' });
        }

        const data_json = await data.json();
        return response.status(data.status).json(data_json);
    } catch (error) {
        response.status(500).json({ error: 'Erro interno do servidor.' });
    }

}

export async function getPastMatches(request, response, next) {

    try {
        const data = await fetch('https://api.pandascore.co/csgo/matches/past?filter[opponent_id]=124530&page=1&per_page=10', {
            headers: {
                'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN_PANDA, 
                'Accept': 'application/json',
            }
        });

        if (data.error) {
            return response.status(data.status).json({ error: 'Erro ao buscar os jogos.' });
        }

        const data_json = await data.json();
        return response.status(data.status).json(data_json);
    } catch (error) {
        response.status(500).json({ error: 'Erro interno do servidor.' });
    }

}