# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

<<<<<<< HEAD
<<<<<<< HEAD
# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
<<<<<<< HEAD
#     origins 'http://localhost:3000'
=======
#     origins 'localhost'
>>>>>>> dc29783f51e7a269277cce7466b0b9ee5efec99b

#     resource '*',
#       headers: :any,
#       methods: [:get, :post, :put, :patch, :delete, :options, :head]
#   end
# end
=======
=======
>>>>>>> ad69f690105aa8b1f7757b0c57c038842917e285
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end