// // const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express');
const { SchemaDirectiveVisitor } = require('graphql-tools');
//schemadirectivevisitor nos permite manejar todas las solicitudes
class IsAuthenticatedRiective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        //se resuelve el contexto actual de la solicitud con la funcion field.resolver
        field.resolve = async function(result, args, context, info) {
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


// function authDirectiveTransformer(schema, directiveName) {
//     mapSchema(schema, {
//         [MapperKind.TYPE]: type => {
//             const authDirective = getDirective(schema, type, directiveName)?.[0]
//             if (authDirective) {
//                 typeDirectiveArgumentMaps[type.name] = authDirective
//             }
//             return undefined
//         },
//         [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
//             const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName]
//             if (authDirective) {
//                 const { requires } = authDirective
//                 if (requires) {
//                     const { resolve = defaultFieldResolver } = fieldConfig
//                     fieldConfig.resolve = function (source, args, context, info) {
//                         const user = context.headers.authorization;
//                         if (!user.hasRole(requires)) {
//                             throw new Error('not authorized')
//                         }
//                         return resolve(source, args, context, info)
//                     }
//                     return fieldConfig
//                 }
//             }
//         }
//     })
// }
