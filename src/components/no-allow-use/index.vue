<template>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
        
        <v-icon size="250" color="red">mdi-cloud-alert</v-icon>
        <h1>{{ $t('Message.App.TheCurrentDomainNameIsNotAvailable') }}</h1>
        <h3>{{ $t('Message.App.PleaseContactYourApplicationServiceProvider') }}</h3>
        <a
          href="/admin/options"
        >{{ $t('Message.App.InTheManagementPanelSettingsAbout') }}</a>
      </div>
</template>
<script>
export default {
    name: 'NoAllowUse',
}
</script>