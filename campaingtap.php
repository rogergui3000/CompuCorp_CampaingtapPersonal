<?php

require_once 'campaingtap.civix.php';

/**
 * Implementation of hook_civicrm_config
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function campaingtap_civicrm_config(&$config) {
  _campaingtap_civix_civicrm_config($config);
}

/**
 * Implementation of hook_civicrm_xmlMenu
 *
 * @param $files array(string)
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function campaingtap_civicrm_xmlMenu(&$files) {
  _campaingtap_civix_civicrm_xmlMenu($files);
}

/**
 * Implementation of hook_civicrm_install
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function campaingtap_civicrm_install() {
  return _campaingtap_civix_civicrm_install();
}

/**
 * Implementation of hook_civicrm_uninstall
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function campaingtap_civicrm_uninstall() {
  return _campaingtap_civix_civicrm_uninstall();
}

/**
 * Implementation of hook_civicrm_enable
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function campaingtap_civicrm_enable() {
  return _campaingtap_civix_civicrm_enable();
}

/**
 * Implementation of hook_civicrm_disable
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function campaingtap_civicrm_disable() {
  return _campaingtap_civix_civicrm_disable();
}

/**
 * Implementation of hook_civicrm_upgrade
 *
 * @param $op string, the type of operation being performed; 'check' or 'enqueue'
 * @param $queue CRM_Queue_Queue, (for 'enqueue') the modifiable list of pending up upgrade tasks
 *
 * @return mixed  based on op. for 'check', returns array(boolean) (TRUE if upgrades are pending)
 *                for 'enqueue', returns void
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function campaingtap_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _campaingtap_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implementation of hook_civicrm_managed
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function campaingtap_civicrm_managed(&$entities) {
  return _campaingtap_civix_civicrm_managed($entities);
}

/**
 * Implementation of hook_civicrm_caseTypes
 *
 * Generate a list of case-types
 *
 * Note: This hook only runs in CiviCRM 4.4+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_caseTypes
 */
function campaingtap_civicrm_caseTypes(&$caseTypes) {
  _campaingtap_civix_civicrm_caseTypes($caseTypes);
}

/**
 * Implementation of hook_civicrm_alterSettingsFolders
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function campaingtap_civicrm_alterSettingsFolders(&$metaDataFolders = NULL) {
  _campaingtap_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

/**
 * @param $angularModule
 */
function campaingtap_civicrm_angularModules(&$angularModule) {
  $angularModule['campaingtapApp'] = array(
    'ext' => 'com.mekeidjeroger.personal.campaingtap',
    'js'  => array('js/app.js'),
    'css' => array('css/campaingtapStyle.css')
  );
}

/**
 * Implementation of hook_civicrm_entityTypes
 *
 * This has been used here for registering entities
 *
 * @param $entityTypes
 */
function campaingtap_civicrm_entityTypes(&$entityTypes) {
  $entityTypes[] = array(
    'name'  => 'CampaingtapSession',
    'class' => 'CRM_Campaingtap_DAO_CampaingtapPersonal',
    'table' => 'civicrm_campaingtappersonal'
  );
}
