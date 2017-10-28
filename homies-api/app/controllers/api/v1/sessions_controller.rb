module Api::V1

class SessionsController < ApplicationController

    def create
        # If the user exists AND the password entered is correct.
        puts 'that was User'
        if user = User.authenticate_with_credentials(params[:email], params[:password])
          # Save the user id inside the browser cookie. This is how we keep the user
          # logged in when they navigate around our website.

          render :status => 200
          puts 'Yay signed in!'
        else
        # If user's login doesn't work, send them back to the login form.
          render :status => 401
        end
      end
    end

      def destroy
        session[:user_id] = nil
        redirect_to '/'
      end
end
