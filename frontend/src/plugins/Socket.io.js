import { io } from 'socket.io-client'

export default {
  install: (app, { connection, options }) => {
    const socket = io(connection, options)
    socket.emit('room', 'room');

    app.config.globalProperties.$socket = socket

    app.provide('socket', socket)
  }
}