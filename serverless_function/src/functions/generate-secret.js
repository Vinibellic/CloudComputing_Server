const { app } = require('@azure/functions');

app.http('generate-secret', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('JavaScript HTTP trigger function processed a request.');

        let length, include, exclude;

        if (request.method === 'GET') {
            length = parseInt(request.query.get('length'));
            include = request.query.get('include');
            exclude = request.query.get('exclude');
        } else if (request.method === 'POST') {
            const body = await request.json();
            ({ length, include, exclude } = body);
        }

        if (!length || !include || !exclude) {
            context.res = {
                status: 400,
                body: "Bitte gib die Länge, die einzuschließenden Zeichen und die auszuschließenden Zeichen an."
            };
            return context.res;
        }

        if (!Number.isInteger(length) || length <= 0) {
            context.res = {
                status: 400,
                body: "Bitte gib eine gültige Zahl für die Länge an."
            };
            return context.res;
        }

        if (typeof include !== 'string' || typeof exclude !== 'string') {
            context.res = {
                status: 400,
                body: "Bitte gib gültige Strings für die einzuschließenden und auszuschließenden Zeichen an."
            };
            return context.res;
        }

        if (include.length === 0) {
            context.res = {
                status: 400,
                body: "Die einzuschließenden Zeichen dürfen nicht leer sein."
            };
            return context.res;
        }

        const generatePassword = (length, include, exclude) => {
            let charset = include.split('').filter(char => !exclude.includes(char)).join('');

            if (charset.length === 0) {
                return null;
            }

            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }

            return password;
        };

        const password = generatePassword(length, include, exclude);
        if (password) {
            context.log(`Generated password: ${password}`);

            context.res = {
                status: 200,
                body: `Generated password: ${password}`
            };
        } else {
            context.res = {
                status: 400,
                body: "Der Zeichensatz ist leer. Bitte überprüfe die Eingabeparameter."
            };
        }

        return context.res;
    }
});