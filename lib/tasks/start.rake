task :start do
<<<<<<< HEAD
  desc 'Start dev server'
  task :development do
    exec 'foreman start -f Procfile.dev'
  end

  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start'
  end
end

task :start => 'start:development'
=======
  exec 'foreman start -p 3000'
end
>>>>>>> 4cbd2f39e74e8f02ea96c571a875e647ea877fde
