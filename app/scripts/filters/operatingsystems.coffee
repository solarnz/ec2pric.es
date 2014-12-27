angular.module('ec2pricesApp')
  .filter('operatingSystemName', () ->
    return (input) ->
      switch input
        when 'linux'
          return 'Linux'
        when 'mswin'
          return 'Windows'
        when 'mswinSQL'
          return 'Windows SQL'
        when 'mswinSQLWeb'
          return 'Windows SQL Web'
        else
          return input
  )
