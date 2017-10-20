# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Re-creating users ..."

User.destroy_all

10.times do

    User.create!({
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.email,
        password_digest: '1234',
        pic_link: Faker::Company.logo
    })
end

puts "Re-creating Product Interests ..."
ProductInterest.destroy_all


10.times do

    o = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
    @randomID = (0...50).map { o[rand(o.length)] }.join

    ProductInterest.create!({
        api_id: @randomID,
        api_type: 'TV',
        user_id: User.all[Random.new.rand(0..9)].id
    })
end

puts "Re-creating circles.."
Circle.destroy_all

5.times do

    Circle.create!({
        name: Faker::Team.name
    })
end


puts "Re-creating circles Users.."
CircleUser.destroy_all

10.times do

    CircleUser.create!({
        circle_id: Circle.all[Random.new.rand(0..4)].id,
        user_id: User.all[Random.new.rand(0..9)].id,
        moderator: false
    })
end

puts "Re-creating Posts.."
Post.destroy_all

20.times do

    Post.create!({
        user_id: User.all[Random.new.rand(0..9)].id ,
        circle_id: Circle.all[Random.new.rand(0..4)].id ,
        content: Faker::Hipster.paragraph(4)
    })
end

puts "Re-creating Posts comments.."
PostComment.destroy_all

20.times do

    PostComment.create!({
        user_id: User.all[Random.new.rand(0..9)].id,
        post_id: Post.all[Random.new.rand(0..9)].id,
        content: Faker::Hipster.paragraph(2),
    })
end

puts "Re-creating Article Like.."
ArticleLike.destroy_all

20.times do

    o = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
    @randomID = (0...50).map { o[rand(o.length)] }.join

    ArticleLike.create!({
        api_id: @randomID,
        user_id: User.all[Random.new.rand(0..9)].id,
    })
end

puts "Re-creating Article Comment.."
ArticleComment.destroy_all

20.times do

    o = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
    @randomID = (0...50).map { o[rand(o.length)] }.join

    ArticleComment.create!({
        api_id: @randomID,
        user_id: User.all[Random.new.rand(0..9)].id,
        content: Faker::Hipster.paragraph(2)
    })
end

