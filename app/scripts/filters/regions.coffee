angular.module('ec2pricesApp')
  .filter('regionName', () ->
    # Fetched from
    # http://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region
    return (input) ->
      humanName = undefined

      switch input
        when 'us-east-1'
          humanName = 'N. Virginia'
        when 'us-west-2'
          humanName = 'Oregon'
        when 'us-west-1'
          humanName = 'N. California'
        when 'eu-west-1'
          humanName = 'Ireland'
        when 'eu-central-1'
          humanName = 'Frankfurt'
        when 'ap-southeast-1'
          humanName = 'Singapore'
        when 'ap-southeast-2'
          humanName = 'Sydney'
        when 'ap-northeast-1'
          humanName = 'Tokyo'
        when 'sa-east-1'
          humanName = 'Sao Paulo'

      if humanName
        humanName = input + ' (' + humanName + ')'
      else
        humanName = input

      return humanName
  )
