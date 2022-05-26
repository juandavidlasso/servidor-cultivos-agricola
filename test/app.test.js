//verificar el valor de una variable
const assert = require('assert');
//enviar consultas a nuestro backend
const request = require('request');
//paquetes de chai que mejoran la funcionalidad de la prueba
const expect = require('chai').expect;
const should = require('chai').should();
require('babel-plugin-require-context-hook/register')();

//*************** PRUEBAS FRONTEND ********************* */
require('isomorphic-fetch');
//es necesario importar react
import React from 'react';
//proporcionan caracteristicas para interactuar con el arbol de react DOM real
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
//eliminar css de las paginas
import register from 'ignore-styles';
register(['.css', '.sass', '.scss']);
//jsdom crea un paquete DOM para nuestro uso, directamente al codigo de React
//const { JSDOM } = require('jsdom');
//inicializar cadena de html
//const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost:3000.test' });
//variables globales para montar nuestro DOM falso
//const { window } = dom;
//ventana falsa en el navegador
//global.window = window;
//documento falso en el navegador
//global.document = window.document;


//describe se usa para estructura el inicio y el final de la prueba
var authToken;

describe('Acceso a servidor no autorizado', function() {
  it('Pagina prohibida', function(done) {
    request('http://localhost:8000', function(err, res, body) {
      should.not.exist(err);
      should.exist(res);
      expect(res.statusCode).to.be.equal(200);
      assert.ok(body.indexOf('Pagina no accesible, ingrese a http://localhost:3000') !== -1);
      done(err);
    });
  });
});

describe('Acceso a servicio graphql no autorizado', function() {   
  it('Pagina prohibida', function(done) {
    request('http://localhost:8000/graphql', function(err, res, body) {
      should.not.exist(err);
      should.exist(res);
      expect(res.statusCode).to.be.equal(200);
      assert.ok(body.indexOf('Pagina no accesible, ingrese a http://localhost:3000') !== -1);
      done(err);
    });
  });
});

describe('Acceso a la aplicación web ', function() {    
  //funcrs and serves the index pageion it inicia la prueba
  it('Renderizado de la pagina web', function(done) {
    request('http://localhost:3000', function(err, res, body) {
      should.not.exist(err);
      should.exist(res);
      expect(res.statusCode).to.be.equal(200);
      assert.ok(body.indexOf('<html') !== -1);
      done(err);
    });
  });
});


describe('Autenticación', function() {
  it('Intento de login sin hacer uso de la aplicación web', function(done) {
    const json = {
      operationName: null,
      query: "mutation autenticarUsuario($input: AutenticarInput) { autenticarUsuario(input: $input) { token }}",
      variables: {
        "input":{
          "email": "administrador@gmail.com",
          "password": "andres"
        }
      }
    };
      
    request.post({
      url: 'http://localhost:8000/graphql',
      json: json,
    }, function(err, res, body) {
        should.not.exist(err);
        should.exist(res);
        expect(res.statusCode).to.be.equal(200);
        //formato del body devuelto, debe ser object
        body.should.be.an('object');
        //comprobar si hay una propiedad de data dentro del object
        body.should.have.property('data');
        //atrapar token
        authToken = body.data.autenticarUsuario.token;
        done(err);
      });
  });
  
  it('Intento de consultas de suertes sin hacer uso de la aplicacion web', function(done) {
    const json = {
      operationName: null,
      query: "query {obtenerSuertes {id_suerte,nombre,area}}",
      variables: {}
    };
    
    request.post({
      url: 'http://localhost:8000/graphql',
      json: json,
    }, function(err, res, body) {
        should.not.exist(err);
        should.exist(res);
        expect(res.statusCode).to.be.equal(200);
        body.should.be.an('object');
        body.should.have.property('data');
        //verificar la longitud del campo, para comprobar que es una matriz
        body.data.should.have.property('obtenerSuertes').with.lengthOf(7);
        done(err);
      }
    )
  });
});
