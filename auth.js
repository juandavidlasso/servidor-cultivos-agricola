const { SchemaDirectiveVisitor, AuthenticationError }= require('apollo-server-express');
//schemadirectivevisitor nos permite manejar todas las solicitudes
class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        //se resuelve el contexto actual de la solicitud con la funcion field.resolver
        field.resolve = async function(...args) {
            const ctx = args[2];
            //contexto tiene un usuario adjunto?
            if (ctx.me) {
                return await resolve.apply(this, args);
            } else {
                throw new AuthenticationError("Necesitas loggearte");
            }
        };
    }
}

module.exports =  AuthDirective;