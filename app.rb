require 'sinatra'
require 'rubyserial'

get '/' do
  haml :index
end

put '/update' do
  serialport = Serial.new '/dev/tty.usbserial'
  serialport.write("#{params[:angle]}\n")
end
