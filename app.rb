require 'sinatra'
require 'rubyserial'

get '/' do
  haml :index
end

put '/update' do
  serialport = Serial.new '/dev/tty.usbserial'

  puts params[:angle]
  serialport.write("#{params[:angle]}\n")
end
